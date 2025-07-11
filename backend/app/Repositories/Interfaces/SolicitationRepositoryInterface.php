<?php

namespace App\Repositories\Interfaces;

interface SolicitationRepositoryInterface
{
    public function findAll();
    public function findById(int $id);
    public function findByUserId(int $userId);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
