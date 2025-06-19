import { StatusCodes } from 'http-status-codes';
import { configurationService } from '../services/configuration.service.js';

let getCurrentSchoolYear = async (req, res, next) => {
    try {
        let currentSchoolYear = await configurationService.getCurrentSchoolYear();
        // return res.status(200).json(currentSchoolYear);
        return res.status(StatusCodes.OK).json({
            currentSchoolYear
        });
    } catch (error) {
        next(error);
    }
}

let updateCurrentSchoolYear = async (req, res, next) => {
    try {
        const updatedConfig = await configurationService.handleUpdateCurrentSchoolYear();
        return res.status(StatusCodes.OK).json(updatedConfig);
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getCurrentSchoolYear,
    updateCurrentSchoolYear
}