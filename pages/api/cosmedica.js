import axios from "axios";

const urlCreateToken = "https://accounts.zoho.com/oauth/v2/token";
const urlCreateLead = "https://zohoapis.com/crm/v2/Leads";


/**
 * {
 * 	"Geschlecht":"Männlich",
 * 	"Last_Name": "Daly",
 * 	"First_Name": "Paul",
 * 	"Email": "p.daly@zylker.com",
 * 	"Status_Haarausfall":"Transaction",
 * 	"Haarfarbe_api":"Rot",
 * 	"Status_Leiden":"Nope",
 * 	"Zufriedenheit":"happy",
 * 	"Haarausfall_Eltern":"ja",
 * 	"Haarausfall_Zeit":"1999-09-01",
 * 	"HT_gehabt":"ja",
 * 	"HT_gehabt_Datum":"1999-09-02",
 * 	"HT_Planung":"morgen"
 * }
 */
export default function handler(req, res) {

    getToken().then(r => {
        sendLead(r.access_token, req.body).then(data => res.status(201).json(data))
    }).catch(err => console.log(err))

}

function getToken() {
    const params = new URLSearchParams()
    params.append('refresh_token', process.env.ZOHO_REFRESH_TOKEN)
    params.append('client_id', process.env.ZOHO_CLIENT_ID)
    params.append('client_secret', process.env.ZOHO_CLIENT_SECRET)
    params.append('grant_type', process.env.GRANT_TYPE)

    const result = axios
        .post(urlCreateToken, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    return result.then((response) => response.data)
}

/**
 Voller Namen		->			Last_Name
 Email				->			mail
 Telefon			->			Mobile
 Country			-> 			Country
 */
function sendLead(oAuthToken, lead) {

    let requestBody = {}
    let recordArray = []
    //Object which zoho accepts
    let recordObject = {
        'Gender': lead.Geschlecht.substring(0, 100),
        'mail': lead.Email.substring(0, 100),
        'Last_Name': lead.First_Name.substring(0, 100) + ', ' + lead.Last_Name.substring(0, 100),
        'State_hairloss': lead.Status_Haarausfall.substring(0, 100),
        'Hair_color': lead.Haarfarbe_api.substring(0, 100),
        'Satisfaction': lead.Zufriedenheit.substring(0, 100),
        'Hairloss_parents': lead.Haarausfall_Eltern.substring(0, 100),
        'Hairloss_time': lead.Haarausfall_Zeit.substring(0, 100),
        'HT_past': lead.HT_gehabt.substring(0, 100),
        'HT_past_date': lead.HT_gehabt_Datum.substring(0, 100),
        'HT_planning': lead.HT_Planung.substring(0, 100),
        'Status_Leiden': lead.Zufriedenheit.substring(0, 100),
        'Country': lead.country.substring(0, 100)
    }

    recordArray.push(recordObject)
    requestBody['data'] = recordArray
    requestBody['trigger'] = ['approval', 'workflow', 'blueprint']

    let result = axios
        .post(urlCreateLead, JSON.stringify(requestBody), {
            headers: {
                Authorization: `Zoho-oauthtoken ${oAuthToken}`, "Content-Type": "application/json"
            }
        })

    return result.then((response) => {
        if(response.status === 201 || response.status === 200){
            return recordObject;
        }
    })
}
