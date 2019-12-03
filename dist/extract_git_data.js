"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
exports.commitData = () => {
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
};
//# sourceMappingURL=extract_git_data.js.map