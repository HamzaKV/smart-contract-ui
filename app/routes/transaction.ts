import { ActionFunction, json } from '@remix-run/node';
import Web3 from 'web3';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const rpcUrl = form.get('rpcUrl') as string;
    const privateKey = form.get('privateKey') as string;
    const contractAddress = form.get('contractAddress') as string;
    const contractAbi = form.get('contractAbi') as string;
    const call = form.get('call') as string;
    const method = form.get('method') as string;
    const args = form.get('args') as string;

    const provider = new Web3.providers.HttpProvider(rpcUrl);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);

    const publicKey =
        web3.eth.accounts.privateKeyToAccount(privateKey).address;

    const contractTransaction = 
        async (call: boolean, method: string, args?: any[]) => {
            if (call) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return await contract.methods[method](...args).call();
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const tx = await contract.methods[method](...args);
            const gas = await tx.estimateGas({ from: publicKey });
            const gasPrice = await web3.eth.getGasPrice();
            const txData = tx.encodeABI();
            // const nonce = await web3.eth.getTransactionCount(account_address);
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    to: contract.options.address,
                    data: txData,
                    gas,
                    gasPrice,
                    // nonce: '0x' + nonce.toString(16)
                },
                privateKey
            );
            const receipt = await web3.eth.sendSignedTransaction(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                signedTx.rawTransaction
            );
            return receipt;
        };

    const tx = await contractTransaction(call === 'true', method, JSON.parse(args));
    return json({ data: tx });
};
