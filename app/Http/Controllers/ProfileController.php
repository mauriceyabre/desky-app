<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Attendance;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function show() {
        return redirect()->route('profile.overview');
    }

    public function overview() {
        return $this->goTo();
    }

    public function timesheet(Request $request) {
        $date = Date::today();
        if ($request->query('date')) {
            $date = Date::make($request->query('date'));
        }

        $attendances = Attendance::query()->whereRelation('user', 'id', '=', auth()->id())->whereYear('date', $date->year)->whereMonth('date', $date->month)->with('projects', function ($query) {
                $query->with('customer:id,name')->without(['members', 'creator']);
            })->get();

        return $this->goTo('timesheet', ['attendances' => $attendances]);
    }

    public function settings() {
        return $this->goTo('settings');
    }

    public function goTo(string $tab = 'overview', ?array $extraData = null) {
        return Inertia::render('App/Members/MemberShow', [
            'user' => fn() => auth()->user()->load('address'),
            'tab' => fn() => $tab,
            'data' => fn() => $extraData,
            'is_auth' => fn() => true,
            'page' => fn() => [
                'title' => auth()->user()->first_name . ' ' . auth()->user()->last_name
            ]
        ]);
    }
}
