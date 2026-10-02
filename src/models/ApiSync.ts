// import axios, { AxiosResponse } from 'axios';

export interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): Promise<Response> {
    return fetch(`${this.rootUrl}/${id}`);
    // .then((response) => response.json())
    // .then(({ data }): void => {
    //   this.set(data);
    // });
  }

  save(data: T): Promise<Response> {
    const { id } = data;

    if (id) {
      return fetch(`${this.rootUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }

    return fetch(this.rootUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}
