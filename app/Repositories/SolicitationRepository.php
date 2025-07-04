<?php

namespace App\Repositories;

use App\Models\Solicitation;
use App\Repositories\Interfaces\SolicitationRepositoryInterface;

class SolicitationRepository implements SolicitationRepositoryInterface
{
    public function all()
    {
        return Solicitation::all();
    }

    public function find(int $id)
    {
        return Solicitation::find($id);
    }

    public function create(array $data)
    {
        return Solicitation::create($data);
    }

    public function update(int $id, array $data)
    {
        $solicitation = $this->find($id);
        if ($solicitation) {
            $solicitation->update($data);
            return $solicitation;
        }
        return null;
    }

    public function delete(int $id)
    {
        $solicitation = $this->find($id);
        if ($solicitation) {
            return $solicitation->delete();
        }
        return false;
    }
}
