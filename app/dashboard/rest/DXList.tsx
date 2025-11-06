// Doubly linked list node
class DXListNode<K, V extends Record<string, any>> {
  id: K;
  data: V;
  prev: DXListNode<K, V> | null = null;
  next: DXListNode<K, V> | null = null;

  constructor(id: K, data: V) {
    this.id = id;
    this.data = data; // e.g. { isPlaying: true, volume: 80, ... }
    // this.prev = null;
    // this.next = null;
  }
}

// OrderedHistory: linked list + Map<id, DXListNode>
export class MapList<
  K extends string | number | symbol,
  V extends Record<string, any> = Record<string, any>,
> {
  readonly map: Map<K, DXListNode<K, V>>;
  head: DXListNode<K, V> | null;
  tail: DXListNode<K, V> | null;
  private _size: number;

  // map: Map<any, DXListNode>;
  // head: DXListNode | null;
  // tail: DXListNode | null;
  // _size: number;

  constructor() {
    // types:
    // - map: Map<K, DXListNode<K, V>>
    // - head/tail: DXListNode<K,V> | null
    // - _size: number
    this.map = new Map<K, DXListNode<K, V>>(); // id -> DXListNode
    this.head = null; // oldest
    this.tail = null; // newest (last)
    this._size = 0;
  }

  size() {
    return this._size;
  }

  // push item to the end (if id exists, update data and move to end)
  // push(id: K, data: Partial<V> = {} as Partial<V>) {
  //     if (this.map.has(id)) {
  //         // update metadata and move node to tail
  //         const node = this.map.get(id);
  //         node.data = Object.assign(node.data || {}, data);
  //         this._moveToEnd(node);
  //         return node;
  //     }

  //     const node = new DXListNode(id, data);
  //     this.map.set(id, node);

  //     if (!this.tail) {
  //         this.head = this.tail = node;
  //     } else {
  //         node.prev = this.tail;
  //         this.tail.next = node;
  //         this.tail = node;
  //     }
  //     this._size++;
  //     return node;
  // }
  push(id: K, data: Partial<V> = {} as Partial<V>): DXListNode<K, V> {
    if (this.map.has(id)) {
      const node = this.map.get(id)!;
      // merge updated fields into existing data
      Object.assign(node.data, data);
      this._moveToEnd(node);
      return node;
    }

    // create a full V object from provided partial -- caller should pass required fields
    // here we assert data as V; in practice ensure the initial data contains required fields
    const node = new DXListNode<K, V>(id, data as V);
    this.map.set(id, node);

    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
    return node;
  }

  // remove an item by id (O(1))
  remove(id: any) {
    const node = this.map.get(id);
    if (!node) return false;

    // unlink
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next; // node was head

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev; // node was tail

    node.prev = node.next = null;
    this.map.delete(id);
    this._size--;
    return true;
  }

  // get metadata by id (O(1))
  get(id: any) {
    const node = this.map.get(id);
    return node ? node.data : undefined;
  }

  // does id exist?
  has(id: any) {
    return this.map.has(id);
  }

  // peek last item (O(1)) — returns { id, data } or undefined
  last() {
    if (!this.tail) return undefined;
    return { id: this.tail.id, data: this.tail.data };
  }

  // pop last (O(1))
  pop() {
    if (!this.tail) return undefined;
    const node = this.tail;
    const id = node.id;
    this.remove(id);
    return { id, data: node.data };
  }

  // move an existing node to the end, O(1)
  // _moveToEnd(node: { prev: { next: any }; next: { prev: any } | null }) {
  //     if (node === this.tail) return;
  //     // unlink node
  //     if (node.prev) node.prev.next = node.next;
  //     else this.head = node.next;

  //     if (node.next) node.next.prev = node.prev;

  //     // append to tail
  //     node.prev = this.tail;
  //     node.next = null;
  //     if (this.tail) this.tail.next = node;
  //     this.tail = node;
  //     if (!this.head) this.head = node;
  // }
  private _moveToEnd(node: DXListNode<K, V>): void {
    if (node === this.tail) return;

    // unlink node
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;

    // append to tail
    node.prev = this.tail;
    node.next = null;
    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
  }

  // iterate from oldest -> newest
  *[Symbol.iterator]() {
    let cur = this.head;
    while (cur) {
      yield { id: cur.id, data: cur.data };
      cur = cur.next;
    }
  }

  // convenience: return array snapshot (oldest -> newest)
  toArray() {
    const out = [];
    for (const e of this) out.push(e);
    return out;
  }
}
