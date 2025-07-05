<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function findById(int $id)
    {
        return User::find($id);
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function update(int $id, array $data)
    {
        $user = User::find($id);
        if ($user) {
            $user->update($data);
        }
        return $user;
    }

    public function delete(int $id)
    {
        $user = User::find($id);
        if ($user) {
            return $user->delete();
        }
        return false;
    }
}
