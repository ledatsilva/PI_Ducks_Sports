using System.Collections.Generic;
using back_pi.DAL.DTO;

namespace back_pi.BLL
{
    public interface IVendedorBll
    {
        void AdicionarNovoVendedor(VendedorDTO vendedor);
        List<VendedorDTO> ObterTodosVendedores();
        List<VendedorDTO> ObterVendedorEmEspera();
        List<VendedorDTO> ObterVendedorEmAusencia();
        List<VendedorDTO> ObterVendedorEmAtendimento();
        VendedorDTO ObterVendedorPorId(string idVendedor);
        VendedorDTO ObterVendedorPorNome(string nomeVendedor);
        VendedorDTO ObterVendedorPorCodigo(string codigoVendedor);
        void AtualizarVendedor(string idVendedor, VendedorDTO vendedorNew);
        void ExcluirVendedor(string idVendedor);
    }
}