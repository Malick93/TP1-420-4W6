import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Album } from './models/album';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   constructor(public http : HttpClient){}
  protected readonly title = signal('TP1');
  artistName: String = ""
  albums : string[] = []
  chansons: string[] = []
  async getAlbums(){
    const apiKey = '9a8a3facebbccaf363bb9fd68fa37abf'
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${this.artistName}&api_key=${apiKey}&format=json`
    const x = await lastValueFrom(this.http.get<any>(url));
    console.log(x)
     try {
    const response: any = await lastValueFrom(this.http.get<any>(url));
    const albumsFromLink = response.topalbums.album; 
    this.albums = albumsFromLink.map((album: any) => album.name)

  } catch(e) {
    this.albums = ["Erreur"]
  }
  console.log(this.albums)
  }

  async getChansons(){
    const apiKey = '9a8a3facebbccaf363bb9fd68fa37abf'
    const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe&format=json`
  }
}

