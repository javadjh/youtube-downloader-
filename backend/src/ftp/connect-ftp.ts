import * as ftp from 'basic-ftp';
const ftpConnection = async (): Promise<ftp.Client> => {
   const ftpConnection = new ftp.Client();
   await ftpConnection.access({
      host: '194.147.142.50',
      user: 'pz17644',
      password: '4cJLq0rE',
      secure: false,
   });

   await ftpConnection.cd('/domains/pz17644.parspack.net/public_html');

   return ftpConnection;
};

export default ftpConnection;
