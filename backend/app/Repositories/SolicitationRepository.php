<?php

namespace App\Repositories;

use App\Models\Solicitation;
use App\Repositories\Interfaces\SolicitationRepositoryInterface;

class SolicitationRepository implements SolicitationRepositoryInterface
{
    public function findAll()
    {
        return Solicitation::orderBy('created_at', 'desc')->get();;
    }

    public function findById(int $id)
    {
        return Solicitation::find($id);
    }

    public function findByUserId(int $userId)
    {
        return Solicitation::where('user_id', $userId)->get();
    }

    public function create(array $data)
    {
        return Solicitation::create($data);
    }

    public function update(int $id, array $data)
    {
        $solicitation = Solicitation::findOrFail($id);
        $solicitation->update($data);
        return $solicitation;
    }

    public function delete(int $id)
    {
        $solicitation = Solicitation::findOrFail($id);
        return $solicitation->delete();
    }
}
