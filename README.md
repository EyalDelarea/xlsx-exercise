# Arbox Home Assignment 

<p align="center">
  <img src="https://user-images.githubusercontent.com/23456142/134665189-6f57de60-8575-4ca3-8ba9-1a293f0746e3.png" width="250">
    <img src="https://user-images.githubusercontent.com/23456142/134664932-6d4286ac-c637-42c2-85e8-22a370b830e6.png" width="250" >
  <img src="https://user-images.githubusercontent.com/23456142/134668416-c53c2120-1376-420c-bf7a-3460b2c630dd.png" width="250">
</p>

## How to use:

* Clone the repo
* `npm install`
* `npm run script`



  **The script will ask for the following info:**
  * File Path 
  * ClubID 
  * Outptname

If left blank, they will fallback into the default values given
in the assignment.
 
* Default values :
  * Path :  `"./files/jimalaya.xlsx"`
  * ClubID: `2400`
  * Outputname: `output`



Handled Errors:
- [x] Empty cells in the imported file
- [x] Incorrect Date format
- [x] Incorrect Phone format (Saved as a string for felxability)
