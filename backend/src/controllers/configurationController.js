import configurationService from '../services/configurationService.js';

let getCurrentSchoolYear = async (req, res) => {
    try {
        let currentSchoolYear = await configurationService.getCurrentSchoolYear();
        return res.status(200).json(currentSchoolYear);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

let updateCurrentSchoolYear = async (req, res) => {
    try {
        let config = await configurationService.getCurrentSchoolYear();

        if (!config || !config.currentSchoolYear || config.semester == null) {
            return res.status(404).json({ message: 'Cấu hình năm học hoặc học kỳ chưa được thiết lập' });
        }

        let { currentSchoolYear, semester } = config;

       
        if (semester < 3) {
            let updatedConfig = await configurationService.updateCurrentSchoolYear({
                newSchoolYear: currentSchoolYear,
                newSemester: semester + 1
            });
            return res.status(200).json(updatedConfig);
        }

        
        let [start, end] = currentSchoolYear.split('-').map(Number);
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: 'Định dạng năm học không hợp lệ (VD: 2024-2025)' });
        }

        let newSchoolYear = `${start + 1}-${end + 1}`;
        let updatedConfig = await configurationService.updateCurrentSchoolYear({
            newSchoolYear,
            newSemester: 1
        });

        return res.status(200).json(updatedConfig);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Lỗi server', error: e.message });
    }
};


module.exports = {
    getCurrentSchoolYear,
    updateCurrentSchoolYear
}