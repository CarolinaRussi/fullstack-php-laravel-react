<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\SolicitationRepositoryInterface;
use Illuminate\Http\Request;


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

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,in_review,completed',
        ]);

        $data['user_id'] = 1;

        $solicitation = $this->solicitationRepo->create($data);

        return response()->json($solicitation, 201);
    }
}
