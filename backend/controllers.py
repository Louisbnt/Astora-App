from fastapi import HTTPException, Request
from models import notes, Note
from schemas import NoteSchema

async def get_notes():
    return notes

async def create_note(note: NoteSchema, request: Request):
    data = await request.json()
    print("Received data:", data)
    if not note.title or not note.content or not note.date:
        raise HTTPException(status_code=422, detail="Invalid data")
    new_note = Note(
        id=note.id,
        title=note.title,
        content=note.content,
        date=note.date
    )
    notes.append(new_note)
    return new_note

async def update_note(note_id: int, note: NoteSchema, request: Request):
    data = await request.json()
    print("Received data:", data)
    for n in notes:
        if n.id == note_id:
            n.title = note.title
            n.content = note.content
            n.date = note.date
            return n
    raise HTTPException(status_code=404, detail="Note not found")

async def delete_note(note_id: int):
    for note in notes:
        if note.id == note_id:
            notes.remove(note)
            return {"message": "Note deleted successfully"}
    raise HTTPException(status_code=404, detail="Note not found")