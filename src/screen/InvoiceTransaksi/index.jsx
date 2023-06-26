import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Pressable,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { colors } from '../../utils';
import { WebView } from 'react-native-webview';
import { Header } from '../../component/molecules';


export default function InvoiceTransaksi({ navigation, route }) {
  const { nama_kamar, nama_pemilik, nama_pelanggan, nama_kos, tanggal_transaksi, id_transaksi, jumlah_bayar } = route.params
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.darkBlue, padding: 15 }}>
        <Header onPress={() => navigation.goBack()} size={30} title='Invoice Transaksi' />
      </View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
          <html lang="en">
            <head>
              <style>
                .clearfix:after {
                  content: "";
                  display: table;
                  clear: both;
                }
              
                a {
                  color: #5D6975;
                  text-decoration: underline;
                }
              
                body {
                  position: relative;
                  width: 21cm;  
                  height: 29.7cm; 
                  margin: 0 auto; 
                  color: #001028;
                  background: #FFFFFF; 
                  font-family: Arial, sans-serif; 
                  font-size: 12px; 
                  font-family: Arial;
                }
              
                header {
                  padding: 10px 0;
                  margin-bottom: 30px;
                }
                
                #logo {
                  text-align: center;
                  margin-bottom: 10px;
                }
                
                #logo img {
                  width: 90px;
                }
                
                #project {
                  float: left;
                }
                
                #project span {
                  color: #5D6975;
                  text-align: right;
                  width: 52px;
                  margin-right: 10px;
                  display: inline-block;
                  font-size: 0.8em;
                }
                
                #company {
                  float: right;
                  text-align: right;
                }
                
                #company span {
                  color: #5D6975;
                  text-align: right;
                  width: 52px;
                  margin-right: 10px;
                  display: inline;
                  font-size: 0.8em;
                }
                
                #project div,
                #company div {
                  white-space: nowrap;        
                }
                
                table {
                  width: 100%;
                  border-collapse: collapse;
                  border-spacing: 0;
                  margin-bottom: 20px;
                }
                

                
                table th,
                table td {
                  text-align: center;
                }
                
                table th {
                  padding: 10px 20px;
                  color: #5D6975;
                  border-bottom: 1px solid #5D6975;
                  border-top: 1px solid #5D6975;
                  white-space: nowrap;        
                  font-weight: bold;
                  background-color: #F5F5F5
                }
                
                table .service,
                table .desc {
                  text-align: left;
                }
                
                table td {
                  padding: 20px;
                  text-align: right;
                }
                
                table td.service,
                table td.desc {
                  vertical-align: top;
                }
                
                table td.unit,
                table td.qty,
                table td.total {
                  font-size: 1.2em;
                }
                
                table td.grand {
                  border-top: 1px solid #C1CED9;
                  font-weight: 500;
                }
                
                #notices .notice {
                  color: #5D6975;
                  font-size: 1.2em;
                }
                
                footer {
                  color: #5D6975;
                  width: 100%;
                  height: 30px;
                  position: absolute;
                  bottom: 0;
                  border-top: 1px solid #C1CED9;
                  padding: 8px 0;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <header class="clearfix">
                <h1 style="">INVOICE</h1>
                <h4 style="margin-bottom: 0cm;">INV/${id_transaksi}</h4>
                <br/>
                <div id="company" class="clearfix">
                  <h5 style="margin-bottom: 5px">UNTUK</h5>
                  <div style="margin-bottom: 5px"><span>Penyewa:</span>${nama_pelanggan}</div>
                  <div><span>Tanggal Transaksi:</span>${tanggal_transaksi}</div>
                </div>
                <div id="project">
                  <h5 style="margin-bottom: 5px">DITERBITKAN ATAS NAMA</h5>
                  <div><span>Pemilik Kos:</span>${nama_pemilik}</div>
                </div>
              </header>
              <main>
                <table>
                  <thead>
                    <tr>
                      <th class="service">NAMA KAMAR</th>
                      <th class="desc">NAMA KOS</th>
                      <th></th>
                      <th></th>
                      <th style="text-align: right;">TOTAL HARGA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="service">${nama_kamar}</td>
                      <td class="desc">${nama_kos}</td>
                      <td class="unit"></td>
                      <td class="qty"></td>
                      <td class="total">Rp ${jumlah_bayar}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td colspan="4" class="grand total">TOTAL TAGIHAN</td>
                      <td class="grand total">Rp ${jumlah_bayar}</td>
                    </tr>
                  </tbody>
                </table>
                <div id="notices">
                  <h5>Metode Pembayaran :</h5>
                  <div class="notice">Transfer Bank</div>
                </div>
              </main>
              <footer>
                Invoice was created on a computer and is valid without the signature and seal.
              </footer>
            </body>
          </html>
        ` }}
      />
    </>
  )
}