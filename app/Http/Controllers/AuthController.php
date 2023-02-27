<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller {
    public function index() {

    }

    public function user(Request $request) {
        return response()->json(['user' => \Auth::user()]);
    }
}
