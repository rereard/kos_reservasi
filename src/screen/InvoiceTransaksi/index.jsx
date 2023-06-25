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
import { useEffect, useState } from 'react';
import { formatIDR } from '../../utils';
import { WebView } from 'react-native-webview';
import { Header } from '../../component/molecules';


export default function InvoiceTransaksi({ navigation, route }) {
  const { nama_kamar, nama_pemilik, nama_pelanggan, nama_kos, tanggal_transaksi, id_transaksi, jumlah_bayar } = route.params
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.darkBlue, padding: 15 }}>
        <Header onPress={() => navigation.goBack()} size={30} title='Invoice Transaksi' />
      </View>
      <View style={{ height: 5, backgroundColor: colors.white }}></View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
        <html>
          <head>
          </head>
          <body style="padding: 10px 50px">
            <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
              <tbody>
                <tr>
                  <td style="width:652px">
                  <h1><span style="font-size:36px"><span style="color:#00a6ff"><strong><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif">Reservasi Kos&nbsp;</span></strong></span></span></h1>
                  </td>
                  <td style="text-align:right; width:433px">
                  <p><span style="font-size:14px">INVOICE</span></p>
            
                  <p><span style="font-size:14px">INV/${id_transaksi}</span></p>
                  </td>
                </tr>
              </tbody>
            </table>
          
            <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
              <tbody>
                <tr>
                  <td style="width:637px">
                  <p><strong>DITERBITKAN ATAS NAMA</strong></p>
            
                  <p>Pemilik Kos: ${nama_pemilik}</p>
            
                  <p>&nbsp;</p>
                  </td>
                  <td style="width:456px">
                  <p><strong>UNTUK</strong></p>
            
                  <p>Pelanggan: ${nama_pelanggan}</p>
            
                  <p>Tanggal Transaksi: ${tanggal_transaksi}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          
            <p>&nbsp;</p>
          
            <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
              <thead>
                <tr style="border-width: 20px">
                  <th scope="col" style="text-align:left; width:33%; border-width: 1px 0px"><span style="font-size:14px"><strong>Nama Kamar</strong></span></th>
                  <th scope="col" style="text-align:left; width:33%"><span style="font-size:14px"><strong>Nama Kos</strong></span></th>
                  <th scope="col" style="text-align:left; width:; width:33%"><span style="font-size:14px"><strong>Harga</strong></span></th>
                </tr>
              </thead>
              <tbody>
                <tr border="0">
                  <td style="width:33%">
                  <p style="text-align: left">${nama_kamar}</p>
            
                  <p>&nbsp;</p>
                  </td>
                  <td style="width:33%">
                  <p style="text-align: left">${nama_kos}</p>
            
                  <p>&nbsp;</p>
                  </td>
                  <td style="width:33%">
                  <p style="text-align: left">Rp ${jumlah_bayar}</p>
            
                  <p>&nbsp;</p>
                  </td>
                </tr>
              </tbody>
            </table>
          
            <p>&nbsp;</p>
          
            <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
              <tbody>
                <tr>
                  <td style="text-align:center; width:66%"><strong>TOTAL TAGIHAN</strong></td>
                  <td style="width:33%"><strong>Rp ${jumlah_bayar}</strong></td>
                </tr>
              </tbody>
            </table>
            
            <br />
            <hr />
            <br />
        
            <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
              <tbody>
                <tr>
                  <td style="text-align:right; width:66%">
                  <p>&nbsp;</p>
                  </td>
                  <td style="width:33%">
                  <p>Metode Pembayaran:</p>
            
                  <p>Bank Transfer</p>
                  </td>
                </tr>
              </tbody>
            </table>
          
            <p>&nbsp;</p>
          </body>
        </html>
        ` }}
      />
    </>
  )
}