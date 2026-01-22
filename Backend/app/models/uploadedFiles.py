from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class UploadedFile(Base):
    __tablename__ = "uploaded_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=False
    )
