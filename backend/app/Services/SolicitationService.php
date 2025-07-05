<?php

namespace App\Services;

use App\Repositories\Interfaces\SolicitationRepositoryInterface;
use App\Enums\SolicitationStatus;
use InvalidArgumentException;

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
        $data['status'] = SolicitationStatus::Pending->value;

        return $this->solicitationRepository->create($data);
    }

    public function updateSolicitation(int $id, array $data)
    {
        if (isset($data['status'])) {
            $validStatuses = array_map(fn($case) => $case->value, SolicitationStatus::cases());
            if (!in_array($data['status'], $validStatuses)) {
                throw new InvalidArgumentException("Invalid status value: {$data['status']}");
            }
        }
        return $this->solicitationRepository->update($id, $data);
    }

    public function deleteSolicitation(int $id)
    {
        return $this->solicitationRepository->delete($id);
    }
}
