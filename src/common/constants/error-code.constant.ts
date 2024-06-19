export enum ErrorEnum {
  DEFAULT = 0,
  SERVER_ERROR = 500,

  XHS_LOGIN_ERROR = 1001,
}

export const ErrorMessage = {
  [ErrorEnum.DEFAULT]: '未知的错误',
  [ErrorEnum.SERVER_ERROR]: '服务繁忙，请稍后再试',

  [ErrorEnum.XHS_LOGIN_ERROR]: '小红书邮箱密码登陆失败',
};
