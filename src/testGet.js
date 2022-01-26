import axios from 'axios';

export default getGithubAccountData = async () => {
    let res = await axios.get("https://roluda-test-1.azurewebsites.net");
    return res.data;
}