import { Request, Response } from "express";
import Note from "../models/Note";
import {getFormattedDate} from '../models/Note'

export const getNotes = async (req: any, res: Response) => {

  try {
    const { search, tag } = req.query;
    const query: any = { user: req.user._id };

   if (search) {
      const regex = new RegExp(search as string, "i");
      query.$or = [{ title: regex }, { tags: regex }];
    }
    if (tag) {
      query.tags = { $in: [tag] };
    }
    const notes = await Note.find(query).sort({ createdAt: -1 });
 
    res.status(200).json(notes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }

};


export const getNoteById = async (req: any, res: Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const createNote = async (req: any, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.create({
      title,
      content,
      tags,
      user: req.user._id,
       createdAt: getFormattedDate(),
      updatedAt: getFormattedDate(),
    });
    res.status(201).json(note);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Invalid note data" });
  }
};


export const updateNote = async (req: any, res: Response) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, updatedAt: getFormattedDate() },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Update failed" });
  }
};


export const deleteNote = async (req: any, res: Response) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note is removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Delete failed" });
  }
};