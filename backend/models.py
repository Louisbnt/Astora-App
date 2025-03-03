from datetime import date

class Note:
    def __init__(self, id: int, title: str, content: str, date: date):
        self.id = id
        self.title = title
        self.content = content
        self.date = date

notes = []