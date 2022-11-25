const fse = require("fs-extra");
const path = require("path");
const request = fse.readJsonSync(path.resolve(__dirname, "requestFile.json"));

const address_repo = fse.readJsonSync(path.resolve(__dirname, "targetFile.json"));

const reusltFile = path.resolve(__dirname, "result.txt");

/**
 * 
 * @param {*} address_repo 视频号小商店地址json
 * @param {*} request 代发传入的运费模板json
 */
function testAddress(address_repo, request) {
  try {
    fse.rmSync(reusltFile);
  } catch (e) {}
  fse.createFileSync(reusltFile);
  const errors = [];
  for (let j = 0; j < request.length; j++) {
    {
      let count = 0;
      const innerProvince = request[j];
      for (let i = 0; i < address_repo.length; i++) {
        const province = address_repo[i];
        if (province.label === innerProvince.province_name) {
          count++;
          const citys = province.options;
          for (let k = 0; k < citys.length; k++) {
            const city = citys[k];
            if (city.label === innerProvince.city_name) {
              count++;
              const blocks = city.options;
              for (let l = 0; l < blocks.length; l++) {
                const block = blocks[l];
                if (block.label === innerProvince.district_name) {
                  count++;
                }
              }
            }
          }
        }
      }
      if (count !== 3) {
        errors.push(innerProvince);
      }
      fse.writeJSONSync(reusltFile, errors);
    }
  }
}

testAddress(address_repo, request);
