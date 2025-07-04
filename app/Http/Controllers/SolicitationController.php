<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\SolicitationRepositoryInterface;

class SolicitationController extends Controller
{
    protected $solicitationRepo;

    public function __construct(SolicitationRepositoryInterface $solicitationRepo)
    {
        $this->solicitationRepo = $solicitationRepo;
    }

    public function index()
    {
        $solicitations = $this->solicitationRepo->all();
        return response()->json($solicitations);
    }
}
