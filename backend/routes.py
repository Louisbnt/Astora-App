from fastapi import APIRouter
from controllers import get_notes, create_note, update_note, delete_note
from schemas import NoteSchema
from typing import List

router = APIRouter()

router.get("/notes", response_model=List[NoteSchema])(get_notes)
router.post("/notes", response_model=NoteSchema)(create_note)
router.put("/notes/{note_id}", response_model=NoteSchema)(update_note)
router.delete("/notes/{note_id}")(delete_note)