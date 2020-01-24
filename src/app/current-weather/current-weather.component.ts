import { Coord } from './../model/coord';
import { Sys } from './../model/sys';
import { Wind } from './../model/wind';
import { Climate } from './../model/climate';
import { Main } from './../model/main';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  formWeather: FormGroup;
  climate : Climate;
  main: Main;
  wind: Wind;
  sys: Sys;
  coord: Coord;
  isLoadingResults = false;
  isShowResult = false;
  isShowError = false;
  cityName: string;
  sunrise: string;
  sunset: string;
  errorMessage: string;
  constructor(private router: Router, private route: ActivatedRoute,private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.climate = new Climate();
    this.main = new Main();
    this.wind = new Wind();
    this.sys = new Sys();
    this.coord = new Coord();
    this.climate.main = this.main;
    this.climate.wind = this.wind;
    this.climate.sys = this.sys;
    this.climate.coord = this.coord;
  }

  createForm() {
    this.formWeather = this.fb.group({
      city: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern('[a-zà-úA-ZÀ-Ú ]*')
        ])
      ]
    });
  }

  get city() {
    return this.formWeather.get('city');
  }

  getCurrentWeatherByCityName(){
    this.isLoadingResults = true;
    this.isShowError= false;
    this.isShowResult= false;

    console.log('city '+this.cityName);
    let tempFormat = '';
    this.api.getWeatherByCityName(this.cityName)
    .subscribe(res => {
      console.log('error here'+res)
      if (res == undefined){
        this.errorMessage ='City not found!!!'; 
        this.isShowError= true;
      } else {
        this.climate = res;
        tempFormat = this.climate.main.temp.toString().substring(0,2);
        this.climate.main.temp = Number(tempFormat);
        this.isShowResult = true;
        this.formatSunriseAndSunset();
      }
      this.isLoadingResults = false;


    }, err => {
      this.isLoadingResults = false;
    });
  }

formatSunriseAndSunset(){
  var timestampSunrise = moment.unix(this.climate.sys.sunrise);
  var timestampSunset = moment.unix(this.climate.sys.sunset);

  this.sunrise = timestampSunrise.format("HH:mm")

  this.sunset = timestampSunset.format("HH:mm")

}

}
