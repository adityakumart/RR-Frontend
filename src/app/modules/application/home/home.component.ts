import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { jsPDF, RGBAData } from 'jspdf';
// @ts-ignore
import domtoimage from 'dom-to-image';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';

import { DateTime } from "luxon";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    addform: FormGroup;
    submitted = false;
    showAgreement = true;
    htmlContent: any;
    @ViewChild(FormGroupDirective, { static: false }) formGroupDirective: FormGroupDirective | any;
    @ViewChild('printArea', { static: false }) printArea: ElementRef | undefined;

    fullData = {
        name: 'Aditya Kumar',
        fatherOrHusband: 'Murthy',
        address: '23-1-1/1B, Rajgopal center',
        drivingLicenseNo: '1234567890',
        drivingLicenseIssuedDate: '09/08/2017',
        drivingLicenseExpiryDate: '09/08/2017',
        drivingLicenseAuthority: '09/08/2017',
        vehicleNo: 'AP BZ 2021',
        agreementFromDate: '09/08/2017',
        agreementToDate: '09/08/2017',
        certificateValidFromDate: '09/08/2017',
        certificateValidToDate: '09/08/2017',
        pucValid: '09/08/2017',
        insuranceValid: '09/08/2017',
    }

    constructor(
        private addformbuild: FormBuilder,
    ) {

        this.addform = addformbuild.group({
            name: ['Aditya Kumar', [Validators.required]],
            fatherOrHusband: ['Murthy', [Validators.required]],
            address: ['23-1-1/1B, Rajgopal center', [Validators.required]],
            drivingLicenseNo: ['1234567890', [Validators.required]],
            drivingLicenseIssuedDate: [new Date(), [Validators.required]],
            drivingLicenseExpiryDate: [new Date(), [Validators.required]],
            drivingLicenseAuthority: ['ads asd', [Validators.required]],
            vehicleNo: ['AP BZ 2021', [Validators.required]],
            agreementFromDate: [new Date(), [Validators.required]],
            agreementToDate: [new Date(), [Validators.required]],
            certificateValidFromDate: [new Date(), [Validators.required]],
            certificateValidToDate: [new Date(), [Validators.required]],
            pucValid: [new Date(), [Validators.required]],
            insuranceValid: [new Date(), [Validators.required]],


        });
    }
    get form(): any { return this.addform.controls; }

    getErrorMessage(input: string, name: string): string {
        // if (this.addform.get(input).hasError('required')) {
        //     return 'Please enter ' + name + '. It can’t be blank';
        // } else if (this.addform.get(input).hasError('pattern')) {
        //     return 'Format of the E-mail ID is incorrect. Please enter the valid E-mail ID.';
        // } else if (this.addform.get(input).hasError('minlength')) {
        //     return 'Please enter ';
        // } else if (this.addform.get(input).hasError('maxlength')) {
        //     return 'max';
        // }
        return ''
    }
    clearAll(): void {
        this.submitted = false;
        this.formGroupDirective.resetForm();
    }

    addcandidate(addcand: any): void {
        if (addcand.valid) {
            this.submitted = true;
            this.showAgreement = false;
            this.fullData = this.addform.value;
            this.fullData = {
                name: this.addform.value.name,
                fatherOrHusband: this.addform.value.fatherOrHusband,
                address: this.addform.value.address,
                drivingLicenseNo: this.addform.value.drivingLicenseNo,
                drivingLicenseIssuedDate: DateTime.fromJSDate(this.addform.value.drivingLicenseIssuedDate).toFormat('MM-dd-yyyy'),
                drivingLicenseExpiryDate: DateTime.fromJSDate(this.addform.value.drivingLicenseExpiryDate).toFormat('MM-dd-yyyy'),
                drivingLicenseAuthority: this.addform.value.drivingLicenseAuthority,
                vehicleNo: this.addform.value.vehicleNo,
                agreementFromDate: DateTime.fromJSDate(this.addform.value.agreementFromDate).toFormat('MM-dd-yyyy'),
                agreementToDate: DateTime.fromJSDate(this.addform.value.agreementToDate).toFormat('MM-dd-yyyy'),
                certificateValidFromDate: DateTime.fromJSDate(this.addform.value.certificateValidFromDate).toFormat('MM-dd-yyyy'),
                certificateValidToDate: DateTime.fromJSDate(this.addform.value.certificateValidToDate).toFormat('MM-dd-yyyy'),
                pucValid: DateTime.fromJSDate(this.addform.value.pucValid).toFormat('MM-dd-yyyy'),
                insuranceValid: DateTime.fromJSDate(this.addform.value.insuranceValid).toFormat('MM-dd-yyyy'),
            }
            console.log(this.addform.value);
        }
    }
    editform() {
        this.showAgreement = true;
    }

    generatePDF() {
        // create temporary element to insert the html string and sanitize the html to make it readable
        // let reportInHtmlElem = document.createElement('div');

        // we hide it from the user view
        // reportInHtmlElem.style.visibility = 'hidden';

        // below method of inserting html expose to possible XSS security issues but it's the only method i've 
        // found that is working to insert my html content 
        // + my html inserted here is created by my rich text editor which is safe
        // reportInHtmlElem.innerHTML += this.reportInHtml;

        // reportInHtmlElem.innerHTML += (this.printArea) ? this.printArea.nativeElement.innerHTML : '';
        // document.body.appendChild(reportInHtmlElem);
        this.htmlContent = (this.printArea) ? this.printArea.nativeElement : '';


        var opt = {
            margin: [400, 25, 25, 25], // top, left, bottom, right,,
            filename: this.fullData.name + '.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { dpi: 900, letterRendering: true, scale: 2 }, // , width: 1080, height: 1920
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
            // pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
            // pagebreak:    { mode: 'avoid-all', before: '#page2el' }
            pagebreak: { mode: ['avoid-all', 'css', 'legacy', 'whiteline'] }
        };

        // html2pdf().from(reportInHtmlElem).set(opt).toPdf().get('pdf').then(function (pdfObject: any) {
        html2pdf().from(this.htmlContent).set(opt).toPdf().get('pdf').then(function (pdfObject: any) {
            // // function to insert the header img
            // // get the number of pages in the pdf
            // let pdf_pages = pdfObject.internal.pages;
            // let headerImg = 'myImg';

            // // We are telling our pdfObject that we are now working on this page
            // // pdfObject.setPage(i);
            // // then we put our img header
            // pdfObject.addImage(headerImg, 0, 0, 0, 0);
        }).save();

        // make it visible back
        // reportInHtmlElem.style.visibility = 'visible';
        // remove temporary element
        // document.body.removeChild(reportInHtmlElem);
    }
    ngOnInit(): void {
    }

}
