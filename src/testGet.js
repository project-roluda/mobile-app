import axios from 'axios';

export default getServerData = async () => {
    // URL = "https://roluda-test-1.azurewebsites.net";
    URL = "http://192.168.2.12:5000"
    let res = await axios.get(URL);
    return res.data;
}