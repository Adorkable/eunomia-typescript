import os from 'os'
var ifaces = os.networkInterfaces();

export default (): Array<string> => {
    var result: Array<string> = []
    if (!ifaces) {
        return []
    }
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        const iface= ifaces[ifname]
        if (!iface) {
            return
        }

        iface.forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return
            }

            result.push(iface.address)

            // if (alias >= 1) {
            //     // this single interface has multiple ipv4 addresses
            //     console.log(ifname + ':' + alias, iface.address);
            // } else {
            //     // this interface has only one ipv4 adress
            //     console.log(ifname, iface.address);
            // }
            ++alias
        })
    })
    return result
}