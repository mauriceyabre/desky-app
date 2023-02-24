<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\PresenceLogsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth:web')->group(function () {
    // ROLE CONTROLLER
    Route::get('/roles', [RoleController::class, 'fetch'])->name('roles.get-all');

    // AUTH PROFILE CONTROLLER
    Route::name('profile.')->prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('show');
        Route::get('/overview', [ProfileController::class, 'overview'])->name('overview');
        Route::get('/projects', [ProfileController::class, 'projects'])->name('projects');
        Route::get('/settings', [ProfileController::class, 'settings'])->name('settings');
        Route::get('/timesheet', [ProfileController::class, 'timesheet'])->name('timesheet');
    });

    // MEMBER CONTROLLER
    Route::name('member.')->prefix('member')->group(function () {
        Route::get('/{id}/overview', [UserController::class, 'overview'])->name('overview');
        Route::get('/{id}/timesheet', [UserController::class, 'timesheet'])->name('timesheet');
        Route::get('/{id}/settings', [UserController::class, 'settings'])->name('settings');
    });

    // MEMBERS CONTROLLER
    Route::name('members.')->prefix('members')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/archived', [UserController::class, 'archived'])->name('archived');
    });

    // USER CONTROLLER
    Route::name('user.')->prefix('user')->group(function () {
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::put('/{id}', [UserController::class, 'update'])->name('update');
        Route::put('/{id}/update-password', [UserController::class, 'updatePassword'])->name('update.password');
        Route::put('/{id}/update-email', [UserController::class, 'updateEmail'])->name('update.email');
        Route::put('/{id}/archive', [UserController::class, 'archive'])->name('archive');
        Route::put('/{id}/restore', [UserController::class, 'restore'])->name('restore');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('destroy');
    });

    // PROJECTS CONTROLLER
    Route::controller(ProjectController::class)->prefix('/projects')->name('projects.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/update-indexes', 'updateIndexes')->name('update-indexes'); // UpdateIndexes
        Route::get('/fetch/{list?}', 'fetch')->name('fetch');
        Route::get('/phases', 'phases')->name('phases');
        Route::get('/archived', 'archived')->name('archived');
        Route::get('/completed', 'completed')->name('completed');
    });

    // PROJECT CONTROLLER
    Route::controller(ProjectController::class)->name('project.')->prefix('project')->group(function () {
        Route::post('/', 'store')->name('store'); // Store new Project
        Route::post('/quick-store', 'quickStore')->name('quick-store'); // Store new Project
        Route::get('/get/{id}', 'get')->name('get')->whereNumber('id'); // Store new Project
        Route::put('/{id}', 'update')->name('update')->whereNumber('id'); // Update Project
        Route::put('/{id}/deliver', 'deliver')->name('deliver')->whereNumber('id'); // Deliver Project
        Route::put('/{id}/complete', 'complete')->name('complete')->whereNumber('id'); // Complete Project
        Route::delete('/{id}/archive', 'archive')->name('archive')->whereNumber('id'); // Archive Project
        Route::delete('/{id}/destroy', 'destroy')->name('destroy')->whereNumber('id'); // Destroy Project
        Route::put('/{id}/restore', 'restore')->name('restore')->whereNumber('id'); // Restore Project
    });

    // CUSTOMERS CONTROLLER
    Route::name('customers.')->prefix('customers')->group(function () {
        Route::get('/get-all', [CustomerController::class, 'getAll'])->name('get-all'); // Get all customers
        Route::get('/get-all-ids', [CustomerController::class, 'getAllIds'])->name('get-all-ids'); // Get all customers ids
    });


    // PRESENCE CONTROLLER
    Route::name('presence.')->prefix('presence')->group(function () {
        Route::post('/', [PresenceLogsController::class, 'start'])->name('start');
        Route::put('/{presence_log}', [PresenceLogsController::class, 'update'])->name('update')->whereNumber('presence_log');
        Route::put('/{presence_log}/stop', [PresenceLogsController::class, 'stop'])->name('stop')->whereNumber('stop');
        Route::delete('/{presence_log}', [PresenceLogsController::class, 'destroy'])->name('destroy')->whereNumber('presence_log');
    });

    // ATTENDANCE CONTROLLER
    Route::get('/attendances', [AttendanceController::class, 'fetch'])->name('attendances.fetch');
    Route::put('/attendance/{id?}', [AttendanceController::class, 'update'])->name('attendance.update');

    // MAIN CONTROLLER
    Route::get('/dashboard', [MainController::class, 'dashboard'])->name('dashboard');
    Route::get('/', function () { return redirect()->route('dashboard'); })->name('home');

    require __DIR__ . '/app/customers.php';

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// DATABASE MIGRATION
Route::prefix('db')->group(function () {
    Route::get('/seed', function () {
        Artisan::call('migrate:fresh --seed');
        return route('projects.index');
    });
});

// FATTURE IN CLOUD API2
Route::get('/fic/fetch/clients', function () {
    $token = 'a/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWYiOiJWQ0ducU5yNEczaHRBUVpuV0cxR2JORDh4YWRBN3dtWiJ9.GWAzUo1p5RTYODQ5L8-JMKFl8rpjcThWcxCdIUOPPJM';
    $clientId = 'RtYnElTxIiUnTqneBKPCwmGuGd6DHPjJ';
    $companyId = '874844';

    $urlGetCompanies = 'https://api-v2.fattureincloud.it/user/companies';
    $url = "https://api-v2.fattureincloud.it/c/$companyId/entities/clients";

    $file = file_get_contents(resource_path() . '/js/Helpers/Data/Clients.json');
    $data = json_decode($file, true)['data'];

    print_r($file);

    //    return Http::acceptJson()
    //        ->withHeaders([
    //            'Authorization' => 'Bearer ' . $token
    //        ])->get($url, ['fieldset' => 'detailed', 'per_page' => 500])->json();
});
