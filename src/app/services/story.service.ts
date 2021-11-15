import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import StoryModel from '../models/Story/StoryModel'
import StoryRequestModel from '../models/Story/StoryRequestModel'

@Injectable({
	providedIn: 'root'
})
export class StoryService {
	private path: string = 'http://socialize.ddns.net:3000/api/story'

	constructor(private http: HttpClient) { }

	public getAllStory() {
		return this.http.get<Array<StoryModel>>(`${this.path}`)
	}

	public createStory(request: StoryRequestModel) {
		return this.http.post<StoryRequestModel>(`${this.path}/add`, request)
	}

}