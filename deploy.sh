# 将 @@appName@@ 替换成您的应用名
# 上下线的概念见 https://help.aliyun.com/document_detail/57399.html

#!/bin/bash
PROG_NAME=$0
ACTION=$1
ONLINE_OFFLINE_WAIT_TIME=30                        # 实例上下线的等待时间
APP_START_TIMEOUT=60                               # 等待应用启动的时间
HEALTH_CHECK_URL=http://app.fengjishi.com.cn/#/    # 应用健康检查URL
HEALTH_CHECK_FILE_DIR=/home/admin/status           # 脚本会在这个目录下生成 nginx-status 文件
APP_HOME=/var/www/App/beemarket-mobile-ui          # 从package.tgz中解压出来的文件放到这个目录下
APP_LOG=${APP_HOME}/logs/app.log                   # 应用日志文件
# 创建出相关目录
mkdir -p ${HEALTH_CHECK_FILE_DIR}
mkdir -p ${APP_HOME}
mkdir -p ${APP_HOME}/logs
usage() {
    echo "Usage: $PROG_NAME {start|stop|online|offline|restart}"
    exit 2
}
online() {
    # 挂回SLB
    touch -m ${HEALTH_CHECK_FILE_DIR}/nginx-status || exit 1
    echo "wait app online in ${ONLINE_OFFLINE_WAIT_TIME} seconds..."
    sleep ${ONLINE_OFFLINE_WAIT_TIME}
}
offline() {
    # 摘除SLB
    rm -f ${HEALTH_CHECK_FILE_DIR}/nginx-status || exit 1
    echo "wait app offline in ${ONLINE_OFFLINE_WAIT_TIME} seconds..."
    sleep ${ONLINE_OFFLINE_WAIT_TIME}
}
health_check() {
    exptime=0
    echo "checking ${HEALTH_CHECK_URL}"
    while true
    do
        status_code=`/usr/bin/curl -L -o /dev/null --connect-timeout 5 -s -w %{http_code} ${HEALTH_CHECK_URL}`
        if [[ x${status_code} != x200 ]];then
            sleep 1
            ((exptime++))
            echo -n -e "\rWait app to pass health check: $exptime..."
        else
            break
        fi
        if [[ ${exptime} -gt ${APP_START_TIMEOUT} ]]; then
            echo
            echo 'app start failed'
            exit 1
        fi
    done
    echo "check ${HEALTH_CHECK_URL} success"
}
start_application() {
    echo 'start application'
}
stop_application() {
    echo 'stop the nodejs process'

    PID=`ps ax | grep 'node' | grep ${APP_HOME} | awk '{print $1}'`
    echo ${PID}
    if [[ ! -z "$PID" ]]; then
        kill -9 ${PID}
    else
        echo 'can not find the process id for nodejs'
    fi
}
start() {
    stop_application
    health_check
    start_application
    online
}
stop() {
    offline
    stop_application
}
case "$ACTION" in
    start)
        start
    ;;
    stop)
        stop
    ;;
    online)
        online
    ;;
    offline)
        offline
    ;;
    restart)
        stop
        start
    ;;
    *)
        usage
    ;;
esac
