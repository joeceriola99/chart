import jsonSmallData from '../pages/api/data2.json'
import jsonLargeData from '../pages/api/data.json'

export default (req, res) => {
    res.status(200).json(jsonLargeData)
}