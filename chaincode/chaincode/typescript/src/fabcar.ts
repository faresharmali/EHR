/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from "fabric-contract-api";
import { Patient } from "./patient";

export class FabCar extends Contract {
    public getAllmethods(ctx: Context) {
        return `this is a test function that will return all the methods in this class 
                1- queryAsset
                2- createAssets
                3- queryAllAssets
                4- AssetExists
                5- UpdateAsset
                6- GetAssetHistory
        `;
    }

    async AssetExists(ctx, assetID) {
        // ==== Check if asset already exists ====
        let assetState = await ctx.stub.getState(assetID);
        return assetState && assetState.length > 0;
    }

    public async checkPermissions(ctx: Context, patientID, DoctorID) {
        /***
         * get patient block JSON.parce() doctorsWithpermission check if doctorID
         * in the array
         * note: admins have permission
         */
        if (await this.AssetExists(ctx, patientID)) {
            let patient: Patient = JSON.parse(
                await this.queryAsset(ctx, patientID)
            );
            if (patient.doctorsWithpermission.split(",").includes(DoctorID)) {
                return true;
            }
        }
        return false;
    }

    public async queryAsset(ctx: Context, patientID: string): Promise<string> {
        const AssetAsBytes = await ctx.stub.getState(patientID); // get the car from chaincode state
        if (!AssetAsBytes || AssetAsBytes.length === 0) {
            throw new Error(`${patientID} does not exist`);
        }
        console.log(AssetAsBytes.toString());
        return AssetAsBytes.toString();
    }

    public async createAssets(ctx: Context, patientID: string, info: string) {
        console.info("============= START : Create patient ===========");
        const data: Patient = JSON.parse(info.toString());
        const value = data.value;
        const bloodGroup = data.bloodGroup || '';
        const glucose = data.glucose || '';
        const heartrate = data.heartrate || '';
        const doctor = data.doctor || '';
        const message = data.message || '';
        const bloodGroupprivate = true;
        const Allergies = data.Allergies || '';
        const type = data.type || '';
        const imageHash = data.imageHash || '';
        const Allergiesprivate = true;
        const Diagnosis = data.Diagnosis || '';
        const Diagnosisprivate = true;
        const treatment = data.treatment || '';
        const treatmentprivate = true;
        const lastVisits = data.lastVisits || '';
        const lastVisitsprivate = true;
        const doctorsWithpermission = data.doctorsWithpermission || '';
        const doctorsWithpermissionprivate = true;
        const radio = data.radio || ''
        const radioprivate = true
        const symptoms = data.symptoms || ''
        const symptomsprivate = true
        const report = data.report || ''
        const reportprivate = true
        const patients: Patient = {
            // ...data
            // value,
            glucose,
            doctor,
            heartrate,
            bloodGroup,
            bloodGroupprivate,
            Allergies,
            Allergiesprivate,
            Diagnosis,
            Diagnosisprivate,
            treatment,
            treatmentprivate,
            lastVisits,
            lastVisitsprivate,
            doctorsWithpermission,
            doctorsWithpermissionprivate,
            report,
            reportprivate,
            radio,
            radioprivate,
            symptoms,
            symptomsprivate,
            type,
            imageHash,
            message




        };

        await ctx.stub.putState(
            patientID,
            Buffer.from(JSON.stringify(patients))
        );
        console.info("============= END : Create patient ===========");
    }

    public async queryAllAssets(ctx: Context): Promise<string> {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }



    async DeleteAsset(ctx, id) {
        if (!id) {
            throw new Error("Asset name must not be empty");
        }

        // let exists = await this.AssetExists(ctx, id);
        // if (!exists) {
        // 	throw new Error(`Asset ${id} does not exist`);
        // }

        // to maintain the color~name index, we need to read the asset first and get its color
        let valAsbytes = await ctx.stub.getState(id); // get the asset from chaincode state
        let jsonResp = {};
        if (!valAsbytes) {
            jsonResp.error = `Asset does not exist: ${id}`;
            throw new Error(jsonResp);
        }
        let assetJSON;
        try {
            assetJSON = JSON.parse(valAsbytes.toString());
        } catch (err) {
            jsonResp = {};
            jsonResp.error = `Failed to decode JSON of: ${id}`;
            throw new Error(jsonResp);
        }
        await ctx.stub.deleteState(id); //remove the asset from chaincode state

        return "Assets deleted";
    }


    public async UpdateAsset(ctx: Context, patientID: string, update: string) {
        const AssetAsBytes = await ctx.stub.getState(patientID); // get the car from chaincode state
        if (!AssetAsBytes || AssetAsBytes.length === 0) {
            throw new Error(`${patientID} does not exist`);
        }
        var patient: Patient = JSON.parse(AssetAsBytes.toString());
        const data = JSON.parse(update);

        patient.value = data.value || patient.value;

        // patient.firstName = data.firstName || patient.firstName;
        // patient.firstNameprivate = data.firstNameprivate?.toString() ? data.firstNameprivate : patient.firstNameprivate;

        // patient.lastName = data.lastName || patient.lastName;
        // patient.lastNameprivate = data.lastNameprivate?.toString() ? data.lastNameprivate : patient.lastNameprivate;

        // patient.birthday = data.birthday || patient.birthday;
        // patient.birthdayprivate = data.birthdayprivate?.toString() ? data.birthdayprivate : patient.birthdayprivate;

        // patient.contact = data.contact || patient.contact;
        // patient.contactprivate = data.contactprivate?.toString() ? data.contactprivate : patient.contactprivate;

        // patient.address = data.address || patient.address;
        // patient.addressprivate = data.addressprivate?.toString() ? data.addressprivate : patient.addressprivate;

        patient.bloodGroup = data.bloodGroup || patient.bloodGroup;
        patient.bloodGroupprivate = data.bloodGroupprivate?.toString() ? data.bloodGroupprivate : patient.bloodGroupprivate;

        patient.Allergies = data.Allergies || patient.Allergies;
        patient.Allergiesprivate = data.Allergiesprivate?.toString() ? data.Allergiesprivate : patient.Allergiesprivate;

        patient.Diagnosis = data.Diagnosis || patient.Diagnosis;
        patient.Diagnosisprivate = data.Diagnosisprivate?.toString() ? data.Diagnosisprivate : patient.Diagnosisprivate;

        patient.treatment = data.treatment || patient.treatment;
        patient.treatmentprivate = data.treatmentprivate?.toString() ? data.treatmentprivate : patient.treatmentprivate;

        patient.lastVisits = data.lastVisits || patient.lastVisits;
        patient.lastVisitsprivate = data.lastVisitsprivate?.toString() ? data.lastVisitsprivate : patient.lastVisitsprivate;

        patient.doctorsWithpermission = data.doctorsWithpermission || patient.doctorsWithpermission;
        patient.doctorsWithpermissionprivate = data.doctorsWithpermissionprivate?.toString() ? data.doctorsWithpermissionprivate : patient.doctorsWithpermissionprivate;

        patient.report = data.report ? data.report : patient.report;
        //patient.report = data.report?.toString() ? data.report : patient.report;

        patient.radio = data.radio ? data.radio : patient.radio;
        //patient.radio = data.radio?.toString() ? data.radio : patient.radio;

        patient.symptoms = data.symptoms || patient.symptoms;
        //patient.symptomsprivate = data.symptomsprivate.toString() ? data.symptomsprivate : patient.symptomsprivate;


        await ctx.stub.putState(
            patientID,
            Buffer.from(JSON.stringify(patient))
        );
    }

    async GetAssetHistory(ctx, ID) {
        let iterator = await ctx.stub.getHistoryForKey(ID);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                console.info(
                    `found state update with value: ${res.value.value.toString(
                        "utf8"
                    )}`
                );
                const obj = JSON.parse(res.value.value.toString("utf8"));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        return result;
    }



    public async queryPrivateAssets(ctx: Context): Promise<string> {
        const startKey = "";
        const endKey = "";
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);

                for (const property in record) {
                    // if (typeof record[property] !== "boolean") continue;

                    // if (record[property]) delete record[property.split("")[0]];

                    if (typeof record[property] !== "boolean") continue;

                    if (record[property]) { delete record[property.split('private')[0]] };



                }
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    public async addDoctorToAsset(ctx: Context, assetID: string, doctorID: string) {
        console.info('============= START : changeCarOwner ===========');

        const patientAsBytes = await ctx.stub.getState(assetID); // get the car from chaincode state
        if (!patientAsBytes || patientAsBytes.length === 0) {
            throw new Error(`${assetID} does not exist`);
        }
        const patient: Patient = JSON.parse(patientAsBytes.toString());
        patient.doctorsWithpermission.toString().concat(',', doctorID)

        await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(patient)));
        return patient
    }

    public async remouveDoctorToAsset(ctx: Context, assetID: string, doctorID: string) {
        console.info('============= START : changeCarOwner ===========');

        const patientAsBytes = await ctx.stub.getState(assetID); // get the car from chaincode state
        if (!patientAsBytes || patientAsBytes.length === 0) {
            throw new Error(`${assetID} does not exist`);
        }
        const patient: Patient = JSON.parse(patientAsBytes.toString());
        patient.doctorsWithpermission.replace(doctorID, '')

        await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(patient)));

    }












    // public async changeCarOwner(ctx: Context, carNumber: string, newOwner: string) {
    //     console.info('============= START : changeCarOwner ===========');

    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     const car: Car = JSON.parse(carAsBytes.toString());
    //     car.owner = newOwner;

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }






    public async createEncryptAssets(ctx: Context, patientID: string, info: string) {
        console.info("============= START : Create patient ===========");
        const data: Patient = JSON.parse(info.toString());
        const value = data.value;

        const firstName = data.firstName;
        const firstNameprivate = data.firstNameprivate;

        const lastName = data.lastName;
        const lastNameprivate = data.lastNameprivate;

        const birthday = data.birthday;
        const birthdayprivate = data.birthdayprivate;

        const contact = data.contact;
        const contactprivate = data.contactprivate;

        const address = data.address;
        const addressprivate = data.addressprivate;

        const bloodGroup = data.bloodGroup;
        const bloodGroupprivate = data.bloodGroupprivate;

        const Allergies = data.Allergies;
        const Allergiesprivate = data.Allergiesprivate;

        const Diagnosis = data.Diagnosis;
        const Diagnosisprivate = data.Diagnosisprivate;

        const treatment = data.treatment;
        const treatmentprivate = data.treatmentprivate;

        const lastVisits = data.lastVisits;
        const lastVisitsprivate = data.lastVisitsprivate;

        const doctorsWithpermission = data.doctorsWithpermission;
        const doctorsWithpermissionprivate = data.doctorsWithpermissionprivate;

        const patients: Patient = {
            value,

            firstName,
            lastName,
            birthday,
            contact,
            address,
            bloodGroup,
            Allergies,
            Diagnosis,
            treatment,
            lastVisits,
            doctorsWithpermission,
            firstNameprivate,
            lastNameprivate,
            birthdayprivate,
            contactprivate,
            addressprivate,
            bloodGroupprivate,
            Allergiesprivate,
            Diagnosisprivate,
            treatmentprivate,
            lastVisitsprivate,
            doctorsWithpermissionprivate,


        };

        const collectionName: string = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(
            collectionName,
            patientID,
            Buffer.from(JSON.stringify(patients))
        );
        console.info("============= END : Create patient ===========");
    }











}
async function getCollectionName(ctx: Context): Promise<string> {
    const mspid: string = ctx.clientIdentity.getMSPID();
    const collectionName: string = `_implicit_org_${mspid}`;
    return collectionName;
}