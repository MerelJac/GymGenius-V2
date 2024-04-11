module "droplet" {
  source       = "./modules/droplet"
  do_token     = var.do_token
  pvt_key      = var.pvt_key
  pub_key      = var.pub_key
}

resource "null_resource" "MainTF" {
  provisioner "local-exec" {
    command = "echo HELLO_WORLD"
  }

  provisioner "local-exec" {
    command = "echo ${module.droplet.droplet.ipv4_address}"
  }

}