import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meme',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})

export class MemesComponent {
  title = 'Meme Machine';
  meme: Meme = {
    id: 1,
    name: 'First Meme',
  imageUrl: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
    topText: 'One Does Not Simply',
    bottomText: 'Eat One Tortilla Chip'
};
  onImageUpdate(newUrl) {
    var img = new Image();
    img.onload = function(){
      var width = img.width
      var height = img.height;
      console.log(document.getElementById('memeSectionWrapper').offsetWidth);
      var maxWidth = document.getElementById('memeSectionWrapper').offsetWidth*.9;
      var maxHeight = 400;
      if(width > maxWidth) {
        height = height*maxWidth/width;
        width = maxWidth;
      }
      document.getElementById("meme1").style.height = String(height)+"px";
      document.getElementById("meme1").style.width = String(width)+"px";
    };
    img.src = newUrl;
    document.getElementById("meme1").style.backgroundImage = "url("+newUrl+")";
  };

  onResize(event) {
    var height = Number(document.getElementById("meme1").style.height.slice(0, -2));
    var width = Number(document.getElementById("meme1").style.width.slice(0, -2));
    console.log(height, width, document.getElementById('memeSectionWrapper').offsetWidth);
    var maxWidth = document.getElementById('memeSectionWrapper').offsetWidth*.9;
    var maxHeight = 400;
    height = height*maxWidth/width;
    if (height < maxHeight) {
      width = maxWidth;
      document.getElementById("meme1").style.height = String(height)+"px";
      document.getElementById("meme1").style.width = String(width)+"px";
    } else if (width < maxWidth) {

    }
   }
  ngAfterViewInit() {
      this.onImageUpdate(this.meme.imageUrl);
  };
}

export class Meme {
  id: number;
  name: string;
  imageUrl: string;
  topText: string;
  bottomText: string;
}
