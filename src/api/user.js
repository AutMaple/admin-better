import config from "@/configs"


export async function login(data) {
    if(config.loginRSA) {
        data = await encryptedData(data);
    }
}