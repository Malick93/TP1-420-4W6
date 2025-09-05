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
  albums : Album[] = []
  chansons: String[] = []
  albumName: String = "";
  artistExiste: boolean = true;
  async getAlbums(){
    this.albums = []
    this.chansons = []
    this.albumName = ""
    const apiKey = '9a8a3facebbccaf363bb9fd68fa37abf'
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${this.artistName}&api_key=${apiKey}&format=json`
    try {
    const response: any = await lastValueFrom(this.http.get<any>(url));
    const albumsFromLink = response.topalbums.album; 
    this.albums = albumsFromLink.map((unAlbum: any) => { 
      const imageUrl = unAlbum.image.find((img: any) => img.size === 'large')?.['#text'];
      return new Album(this.artistName ,unAlbum.name, imageUrl)})
      this.artistExiste = true;
    } catch(e) {
      this.artistExiste = false;
    }
  }

  async getChansons(album: Album){
    this.chansons = []
    this.albumName = album.name
    this.artistName = album.artist
    const apiKey = '9a8a3facebbccaf363bb9fd68fa37abf'
    const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${this.artistName}&album=${this.albumName}&format=json`
    const x = await lastValueFrom(this.http.get<any>(url));
    const tracksFromAlbum: any = x.album.tracks.track
    this.chansons = tracksFromAlbum.map((track: any) => track.name)
  }
}

