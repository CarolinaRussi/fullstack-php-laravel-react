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

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,in_review,completed',
        ]);

        $data['user_id'] = $request->user()->id;

        $solicitation = $this->solicitationRepo->create($data);

        return response()->json($solicitation, 201);
    }

    public function show($id)
    {
        $solicitation = $this->solicitationRepo->findById($id);

        if (! $solicitation) {
            return response()->json(['message' => 'Solicitation not found'], 404);
        }

        return response()->json($solicitation);
    }

    public function myRequests(Request $request)
    {
        $userId = $request->user()->id;

        $solicitations = $this->solicitationRepo->findByUserId($userId);

        return response()->json($solicitations);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'type' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in_review,completed',
        ]);

        $solicitation = $this->solicitationRepo->update($id, $data);

        return response()->json($solicitation);
    }

    public function destroy($id)
    {
        $deleted = $this->solicitationRepo->delete($id);

        return response()->json(['deleted' => $deleted]);
    }
}
