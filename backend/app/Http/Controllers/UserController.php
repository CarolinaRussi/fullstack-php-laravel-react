<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Enums\UserType;
use Illuminate\Validation\Rules\Enum;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function me(Request $request)
    {
        $user = $this->userService->getUserById($request->user()->id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $request->user()->id,
            'user_type' => ['sometimes', new Enum(UserType::class)],
        ]);

        $user = $this->userService->updateUser($request->user()->id, $data);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function destroy($id)
    {
        $deleted = $this->userService->deleteUser($id);

        return response()->json(['deleted' => $deleted]);
    }
}
