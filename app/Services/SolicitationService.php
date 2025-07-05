<?php

namespace App\Services;

use App\Repositories\Interfaces\SolicitationRepositoryInterface;

class SolicitationService
{
    private $solicitationRepository;

    public function __construct(SolicitationRepositoryInterface $solicitationRepository)
    {
        $this->solicitationRepository = $solicitationRepository;
    }

    public function getSolicitationsByUserId(int $user_id)
    {
        return $this->solicitationRepository->findByUserId($user_id);
    }

    public function getSolicitationById(int $id)
    {
        return $this->solicitationRepository->findById($id);
    }

    public function createSolicitation(array $data)
    {
        return $this->solicitationRepository->create($data);
    }

    public function updateSolicitation(int $id, array $data)
    {
        return $this->solicitationRepository->update($id, $data);
    }

    public function deleteSolicitation(int $id)
    {
        return $this->solicitationRepository->delete($id);
    }
}
