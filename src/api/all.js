import request from '@/utils/request'
// 三方监理
export function addSupervisor(data) {
    return request({
        url: '/supervisor/addSupervisor',
        method: 'post',
        data
    })
}
// 删除
export function deleteSupervisor(params) {
    return request({
        url: '/supervisor/deleteSupervisor',
        method: 'delete',
        params
    })
}
// 查询
export function supervisorqueryList(params) {
    return request({
        url: '/supervisor/queryList',
        method: 'get',
        params
    })
}
// 修改
export function updateSupervisor(data) {
    return request({
        url: '/supervisor/updateSupervisor',
        method: 'post',
        data
    })
}
// 全屋定制
export function addWholeHouseCustomizationPlanCase(data) {
    return request({
        url: '/wholeHouseCustomizationPlanCase/addWholeHouseCustomizationPlanCase',
        method: 'post',
        data
    })
}
// 删除
export function deleteWholeHouseCustomizationPlanCase(params) {
    return request({
        url: '//wholeHouseCustomizationPlanCase/deleteWholeHouseCustomizationPlanCase',
        method: 'delete',
        params
    })
}
// 查询
export function wholeHouseCustomizationPlanCasequeryList(params) {
    return request({
        url: '/wholeHouseCustomizationPlanCase/queryList',
        method: 'get',
        params
    })
}
// 修改
export function updateWholeHouseCustomizationPlanCase(data) {
    return request({
        url: '/wholeHouseCustomizationPlanCase/updateWholeHouseCustomizationPlanCase',
        method: 'post',
        data
    })
}
// 合同总结
export function addContractSummary(data) {
    return request({
        url: '/contractSummary/addContractSummary',
        method: 'post',
        data
    })
}
// 删除
export function deleteContractSummary(params) {
    return request({
        url: '/contractSummary/deleteContractSummary',
        method: 'delete',
        params
    })
}
// 查询
export function queryListByContractId(params) {
    return request({
        url: '/contractSummary/queryListByContractId',
        method: 'get',
        params
    })
}
// 修改
export function updateContractSummary(data) {
    return request({
        url: '/contractSummary/updateContractSummary',
        method: 'post',
        data
    })
}
// 合同阶段
export function addContractStage(data) {
    return request({
        url: '/contractStage/addContractStage',
        method: 'post',
        data
    })
}
// 删除
export function deleteContractStage(params) {
    return request({
        url: '/contractStage/deleteContractStage',
        method: 'delete',
        params
    })
}
// 查询
export function contractStagequeryList(params) {
    return request({
        url: '/contractStage/queryList',
        method: 'get',
        params
    })
}
// 修改
export function updateContractStage(data) {
    return request({
        url: '/contractStage/updateContractStage',
        method: 'post',
        data
    })
}
// 合同（工地）API
export function contractAddContract(data) {
    return request({
        url: '/contract/addContract',
        method: 'post',
        data
    })
}
// 删除
export function contractdeleteContract(params) {
    return request({
        url: '/contract/deleteContract',
        method: 'delete',
        params
    })
}
// 工长端功能 查询 我的工地 -在建工地
export function queryBuildingContract(params) {
    return request({
        url: '/contract/queryBuildingContract',
        method: 'get',
        params
    })
}
// 根据id查询详细信息
export function queryContractById(params) {
    return request({
        url: '/contract/queryContractById',
        method: 'get',
        params
    })
}
// 工长端功能 查询 我的工地 -已完成工地
export function queryFinishContract(params) {
    return request({
        url: '/contract/queryFinishContract',
        method: 'get',
        params
    })
}
// 工地一览 查询列表
export function contractqueryList(params) {
    return request({
        url: '/contract/queryList',
        method: 'get',
        params
    })
}
// 修改合同信息
export function contractupdateContract(data) {
    return request({
        url: '/contract/updateContract',
        method: 'post',
        data
    })
}
// 商品api
export function goodsadd(data) {
    return request({
        url: '/goods/add',
        method: 'post',
        data
    })
}
// 删除
export function goodsdelete(params) {
    return request({
        url: '/goods/delete',
        method: 'delete',
        params
    })
}
// 查询
export function goodsqueryList(params) {
    return request({
        url: '/goods/queryList',
        method: 'get',
        params
    })
}
// 修改
export function goodsupdate(data) {
    return request({
        url: '/goods/update',
        method: 'post',
        data
    })
}
// 商品类型API
export function goodsTypeadd(data) {
    return request({
        url: '/goodsType/add',
        method: 'post',
        data
    })
}
// 删除
export function goodsTypedelete(params) {
    return request({
        url: '/goodsType/delete',
        method: 'delete',
        params
    })
}
// 查询
export function goodsTypequeryList(params) {
    return request({
        url: '/goodsType/queryList',
        method: 'get',
        params
    })
}
// 修改
export function goodsTypeupdate(data) {
    return request({
        url: '/goodsType/update',
        method: 'post',
        data
    })
}
// 商家api
export function businessadd(data) {
    return request({
        url: '/business/add',
        method: 'post',
        data
    })
}
// 删除
export function businessdelete(params) {
    return request({
        url: '/business/delete',
        method: 'delete',
        params
    })
}
// 查询
export function businessqueryList(params) {
    return request({
        url: '/business/queryList',
        method: 'get',
        params
    })
}
// 修改
export function businessupdate(data) {
    return request({
        url: '/business/update',
        method: 'post',
        data
    })
}
// 基础信息API
export function addBaseInformation(data) {
    return request({
        url: '/BaseInformation/addBaseInformation',
        method: 'post',
        data
    })
}
// 删除
export function deleteBaseInformation(params) {
    return request({
        url: '/BaseInformation/deleteBaseInformation',
        method: 'delete',
        params
    })
}
// 查询
export function queryBaseInformation(params) {
    return request({
        url: '/BaseInformation/queryBaseInformation',
        method: 'get',
        params
    })
}
// 查询
export function queryBaseInformationList(params) {
    return request({
        url: '/BaseInformation/queryBaseInformationList',
        method: 'get',
        params
    })
}
// 修改
export function updateBaseInformation(data) {
    return request({
        url: '/BaseInformation/updateBaseInformation',
        method: 'put',
        data
    })
}
// 工长模式API
export function addForeman(data) {
    return request({
        url: '/foreman/addForeman',
        method: 'post',
        data
    })
}
// 删除
export function deleteForeman(params) {
    return request({
        url: '/foreman/deleteForeman',
        method: 'delete',
        params
    })
}
// 查询
export function queryForemanById(params) {
    return request({
        url: '/foreman/queryForemanById',
        method: 'get',
        params
    })
}
// 查询
export function foremanqueryList(params) {
    return request({
        url: '/foreman/queryList',
        method: 'get',
        params
    })
}
// 修改
export function updateForeman(data) {
    return request({
        url: '/foreman/updateForeman',
        method: 'post',
        data
    })
}
// 工长模式介绍API
export function addForemanInformation(data) {
    return request({
        url: '/foremanInformation/addForemanInformation',
        method: 'post',
        data
    })
}
// 删除
export function foremandeleteForemanInformation(params) {
    return request({
        url: '/foremanInformation/deleteForemanInformation',
        method: 'delete',
        params
    })
}
// 查询
export function foremanInformationqueryList(params) {
    return request({
        url: '/foremanInformation/queryList',
        method: 'get',
        params
    })
}
// 修改
export function updateForemanInformation(data) {
    return request({
        url: '/foremanInformation/updateForemanInformation',
        method: 'post',
        data
    })
}
// 市场工价controller
export function addMarketRate(data) {
    return request({
        url: '/MarketRate/addMarketRate',
        method: 'post',
        data
    })
}
// 删除
export function deleteForemanInformation(data) {
    return request({
        url: '/MarketRate/deleteMarketRateByIds',
        method: 'post',
        data
    })
}
// 查询
export function getMarketRateList(params) {
    return request({
        url: '/MarketRate/getMarketRateList',
        method: 'get',
        params
    })
}
// 修改
export function updateMarketRate(data) {
    return request({
        url: '/MarketRate/updateMarketRate',
        method: 'post',
        data
    })
}
// 广告API
export function addAdvertisement(data) {
    return request({
        url: '/advertisement/addAdvertisement',
        method: 'post',
        data
    })
}
// 删除
export function deleteAdvertisementByIds(data) {
    return request({
        url: '/advertisement/deleteAdvertisementByIds',
        method: 'post',
        data
    })
}
// 查询
export function getAdvertisementList(params) {
    return request({
        url: '/advertisement/List',
        method: 'get',
        params
    })
}
// 修改
export function updateAdvertisement(data) {
    return request({
        url: '/advertisement/updateAdvertisement',
        method: 'post',
        data
    })
}
// 开荒保洁API
export function cleanadd(data) {
    return request({
        url: '/clean/add',
        method: 'post',
        data
    })
}
// 删除
export function cleandelete(params) {
    return request({
        url: '/clean/delete',
        method: 'delete',
        params
    })
}
// 查询
export function cleanqueryList(params) {
    return request({
        url: '/clean/queryList',
        method: 'get',
        params
    })
}
// 修改
export function cleanupdate(data) {
    return request({
        url: '/clean/update',
        method: 'post',
        data
    })
}
//房屋智能API
export function homeTechnologyadd(data) {
    return request({
        url: '/homeTechnology/add',
        method: 'post',
        data
    })
}
// 删除
export function homeTechnologydelete(params) {
    return request({
        url: '/homeTechnology/delete',
        method: 'delete',
        params
    })
}
// 查询
export function homeTechnologyqueryList(params) {
    return request({
        url: '/homeTechnology/queryList',
        method: 'get',
        params
    })
}
// 修改
export function homeTechnologyupdate(data) {
    return request({
        url: '/homeTechnology/update',
        method: 'post',
        data
    })
}
// 通用本地上传请求（单个）
export function fileUpload(data) {
    return request({
        url: '/file/upload',
        method: 'post',
        data
    })
}

// 施工标准API
export function addConstructionStandard(data) {
    return request({
        url: '/constructionStandard/addConstructionStandard',
        method: 'post',
        data
    })
}
// 删除
export function deleteConstructionStandardByIds(data) {
    return request({
        url: '/constructionStandard/deleteConstructionStandardByIds',
        method: 'post',
        data
    })
}
// 查询
export function getConstructionStandardList(params) {
    return request({
        url: '/constructionStandard/getConstructionStandardList',
        method: 'get',
        params
    })
}
// 修改
export function updateConstructionStandard(data) {
    return request({
        url: '/constructionStandard/updateConstructionStandard',
        method: 'post',
        data
    })
}
// 根据施工类型查询所有资料
export function ConstructionKnowledgequeryList(params) {
    return request({
        url: '/ConstructionKnowledge/queryList',
        method: 'get',
        params
    })
}
export function addUser(data) {
    return request({
        url: '/user/addUser',
        method: 'post',
        data
    })
}
// // 删除
export function deleteUserById(params) {
    return request({
        url: '/user/deleteUserById',
        method: 'delete',
        params
    })
}
// 查询
export function queryUserList(data) {
    return request({
        url: '/user/queryUserList',
        method: 'post',
        data
    })
}
// 修改
export function updateUser(data) {
    return request({
        url: '/user/updateUser',
        method: 'post',
        data
    })
}