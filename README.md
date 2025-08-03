
## Geliştirici

**Kerem İhsan Ulaşan**

## ✨ Özellikler

- **3D Küp Düzenleme**: Genişlik, yükseklik, derinlik ayarları (20-120cm)
- **Modül Sistemi**: Akıllı otomatik modül ekleme (sadece 1 extra modül)
- **Kamera Kontrolü**: Mouse ile döndürme, yakınlaştırma
- **Sürüklenebilir Güneş**: Işık yönünü değiştirme
- **Gerçek Zamanlı Gölgeler**: Dinamik gölge hesaplaması

## 🔍 Önemli Notlar

### Gölge Sistemi Hakkında
- **Güneş Pozisyonu**: Sarı küp (güneş) ne kadar yüksekte olursa olsun, gölge derinliği objenin boyutuna göre değişmez
- **Gölge Amacı**: Gölge sistemi sadece objelerin nasıl durduğunu görsel olarak göstermek için yapılmıştır
- **Fiziksel Gerçeklik**: Gerçek fizik simülasyonu değil, görsel referans amaçlıdır

### Modül Sistemi Mantığı  
- **Tek Ekleme**: Soruyu "sadece 1 tane extra model oluştur" şeklinde anladığım için bu şekilde tasarlandı
- **60cm Kuralı**: İlk modül 60cm'yi geçtiğinde otomatik olarak sadece 1 adet ikinci modül eklenir
- **Manuel Ekleme**: Daha fazla modül için "Add Module" butonu kullanılabilir

### Gereksinimler
   - Node.js (v16 veya üzeri)
   - npm paket yöneticisi

### Temel Kontroller
- **Fare ile kamera**: 
  - Sol tık + sürükle: Döndür
  - Kaydır: Yakınlaştır/uzaklaştır
  - Sağ tık + sürükle: Hareket ettir
- **Güneş kontrolü**: Sarı küpü sürükleyerek ışığı hareket ettirin
- **Slider'lar**: Genişlik, yükseklik, derinlik ayarlayın (20-120cm)

### Modül Yönetimi
- **Otomatik ekleme**: 60cm aştığında ikinci modül gelir
- **Modül seçimi**: Listeden modül adına tıklayın
- **Boyut ayarlama**: Her modülü ayrı ayrı boyutlandırın
- **Ekleme/Silme**: Butonlarla manuel modül yönetimi

## Live Demo
**[Canlı Demo Url →](https://sprightly-heliotrope-bc8e06.netlify.app/)**


