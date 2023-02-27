<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        if (\Auth::check()) {
            $auth = $request->user()->load('latestAttendance');
            $user = [
                'id' => $auth->id,
                'first_name' => $auth->first_name,
                'last_name' => $auth->last_name,
                'email' => $auth->email,
                'latest_attendance' => $auth->latestAttendance,
            ];
        } else {
            $user = null;
        }
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
//            'ziggy' => function () use ($request) {
//                return array_merge((new Ziggy)->toArray(), [
//                    'location' => $request->url(),
//                ]);
//            },
            'toast' => fn() => $request->session()->get('toast')
        ]);
    }
}
