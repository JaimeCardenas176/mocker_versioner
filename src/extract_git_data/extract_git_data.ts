import * as background_exec from 'child_process';


function gitDataToString() :Promise<string[]>{
   return new Promise((resolve, reject) => {
       background_exec.exec('bash ./dist/extract_git_data/command_git.sh' , (err, response) => {
        let strArr: string[];
        if (!err && response) {
            response = response.trim();
            strArr = response.split('\n');
            strArr.map((s) => {
                s = s.trim();
            });
            resolve(strArr);
        } else {
            reject(err);
        }
       })
    });
}

export const getDate = () => {
    return gitDataToString().then((result)=>{
        if (result.length === 4)
            return result[1]+'-'+result[2]+'-'+result[3];
        else{
            throw new Error("Not found commit");
        }
    }).catch((error)=>{
        
        throw new Error(error);
    });
    
}

export const getHash = () => {
    return gitDataToString().then((result)=>{
        if (result.length === 4)
            return result[0];
        else{
            throw new Error("Not found commit");
        }
    }).catch((error)=>{
        
        throw new Error(error);
    });
}
