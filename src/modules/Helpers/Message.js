import BaseHelper from './BaseHelper.js';
import MessageDocument from './MessageDocument.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class Message extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    map.set(this, {
        id: this.property(object, 'id').orNull(),
        note: this.property(object, 'note').orNull(),
        noteSize: this.property(object, 'noteSize').orNull(),
        read: this.property(object, 'read').orNull(),
        authorId: this.property(object, 'authorId').orNull(),
        authorType: this.property(object, 'authorType').orNull(),
        createdAt: this.property(object, 'createdAt').orNull(),
        documents: this.property(object,'documents').using(_partial(_map, _partial.placeholder, v => new MessageDocument(v))).orDefault([])
    });
    Object.seal(this);
  }

  get id() {
    return map.get(this).id;
  }

  get note() {
    return map.get(this).note;
  }

  get noteSize() {
    return map.get(this).noteSize;
  }

  get read() {
    return map.get(this).read;
  }

  get authorId() {
    return map.get(this).authorId;
  }

  get authorType() {
    return map.get(this).authorType;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get documents() {
    return map.get(this).documents;
  }

  toObject() {
    return {
      id: this.id,
      note: this.note,
      noteSize: this.noteSize,
      read: this.read,
      authorId: this.authorId,
      authorType: this.authorType,
      createdAt: this.createdAt,
      documents: this.documents.map(document => document.toObject())
    };
  }

}
