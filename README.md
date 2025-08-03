
## Geliştirici

**Kerem İhsan Ulaşan**

## ✨ Özellikler

- **3D Küp Düzenleme**: Genişlik, yükseklik, derinlik ayarları (20-120cm)
- **Modül Sistemi**: Akıllı otomatik modül ekleme (sadece 1 extra modül)
- **Kamera Kontrolü**: Mouse ile döndürme, yakınlaştırma
- **Sürüklenebilir Güneş**: Işık yönünü değiştirme
- **Gerçek Zamanlı Gölgeler**: Dinamik gölge hesaplaması
- ** Mobil Uyumlu**: Touch kontrolleri ve responsive tasarım

## 🔍 Önemli Notlar

### Gölge Sistemi Hakkında
- **Güneş Pozisyonu**: Güneş ne kadar yüksekte olursa olsun, gölge derinliği objenin boyutuna göre değişmez
- **Gölge Amacı**: Gölge sistemi sadece objelerin nasıl durduğunu görsel olarak göstermek için yapılmıştır
- **Obje Gölgeleri**: Güneşin önünde bir obje varsa, onun büyüklüğüne göre diğer modüllerde gölge oluşabilir
- **Güneş Görünürlüğü**: Cismin üstüne yaklaştırdığınızda güneşi daha net görebilirsiniz
- **Fiziksel Gerçeklik**: Gerçek fizik simülasyonu değil, görsel referans amaçlıdır


### Modül Sistemi Mantığı  
- **Tek Ekleme**: Soruyu "sadece 1 tane extra model oluştur" şeklinde anladığım için bu şekilde tasarlandı
- **60cm Kuralı**: İlk modül 60cm'yi geçtiğinde otomatik olarak sadece 1 adet ikinci modül eklenir
- **Manuel Ekleme**: Daha fazla modül için "Add Module" butonu kullanılabilir

##  Nasıl Çalıştırılır

### Hızlı Başlangıç
```bash
# 1. Projeyi klonla
git clone https://github.com/keremiu/3D_Cube_With_Three.js.git
cd 3D_Cube_With_Three.js

# 2. Paketleri yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev
```

### Gereksinimler
   - Node.js (v16 veya üzeri)
   - npm paket yöneticisi


### Temel Kontroller
- **Fare/Touch ile kamera**: 
  - Sol tık + sürükle / Touch + sürükle: Döndür
  - Kaydır / Pinch: Yakınlaştır/uzaklaştır
  - Sağ tık + sürükle / İki parmak: Hareket ettir
- **Güneş kontrolü**: Sarı küpü sürükleyerek ışığı hareket ettirin (touch destekli)
- **Slider'lar**: Genişlik, yükseklik, derinlik ayarlayın (20-120cm)
- **📱 Mobil**: Kontrol panelini açmak için ☰ butonuna dokunun

### Modül Yönetimi
- **Otomatik ekleme**: 60cm aştığında ikinci modül gelir
- **Modül seçimi**: Listeden modül adına tıklayın
- **Boyut ayarlama**: Her modülü ayrı ayrı boyutlandırın
- **Ekleme/Silme**: Butonlarla manuel modül yönetimi

## 📱 Mobil Uyumluluk

### Responsive Tasarım
- **Otomatik Uyarlama**: Ekran boyutuna göre arayüz düzenlenir
- **Touch Kontrolleri**: Parmak hareketleriyle 3D sahne kontrolü
- **Hamburger Menü**: Mobilde kontrol paneli gizlenebilir (☰ butonu)
- **Optimize Performans**: Mobil cihazlar için pixel ratio optimizasyonu

### Mobil Özellikler
- **Touch Sürükleme**: Güneşi parmakla sürükleyebilirsiniz
- **Responsive Butonlar**: Mobil dokunuş için optimize edilmiş buton boyutları
- **Esnek Panel**: Kontrol paneli ekranın %50'sini geçmez
- **Hızlı Erişim**: Panel dışına dokunarak kontrolleri gizleyebilirsiniz

## Live Demo
**[Canlı Demo Url →](https://sprightly-heliotrope-bc8e06.netlify.app/)**


