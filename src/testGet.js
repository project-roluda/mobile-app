import axios from 'axios';

export default getGithubAccountData = async () => {
    let res = await axios.get("https://api.github.com/users/octocat");
    console.log("getGithubAccountData res.data: ", res.data);
    return res.data;
}