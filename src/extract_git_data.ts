import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, "./.env") });

export const commitData = () => {
    // if (status_conf["enable"]){
    //     if (!interval_status){
    //         interval_status = setInterval(
    //             function() {
    //                 status_search(endpoints_audit);
    //             },
    //             status_conf["seconds"]*1000,
    //         );
    //     }else{
    //         clearInterval(interval_status);
    //         interval_status = setInterval(
    //             function() {
    //                 status_search(endpoints_audit);
    //             },
    //             status_conf["seconds"]*1000,
    //         );
    //     }
    // }else{
    //     if (interval_status){
    //         clearInterval(interval_status);
    //         interval_status=null;
    //     }
    // }

}