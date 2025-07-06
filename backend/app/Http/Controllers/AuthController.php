<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Enums\UserType;
use Illuminate\Validation\Rules\Enum;
use App\Models\User;
use App\Services\UserService;

class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
            'user_type' => ['required', new Enum(UserType::class)],
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = $this->userService->createUser($data);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'  => $user->only(['id', 'name', 'email', 'user_type']),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Email ou senha inválidos'], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'  => $user->only(['id', 'name', 'email', 'user_type']),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Usuário deslogado com sucesso!']);
    }
}
